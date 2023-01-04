#---------------------------------------------------------------------- Packages used ----------------------------------------------------------------------#
import numpy as np
import cv2
import matplotlib
import matplotlib.pyplot as plt
matplotlib.use('Agg')
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#

# the id of the image that be saved


class counter:
    resultId = 0
    imgId = 0


class db:
    fft_images = {}

# ------------------------------------------------------------------ Function description ------------------------------------------------------------------#
#   Arguments: Image
#   Packages used : numpy package for fourier transform : returns a numpy array of the image in shape (height, width, 3"BGR")
#   return: magnitude and phase of the passed image respectively.
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#


def magnitude_angle(image):

    image_fourier = np.fft.fft2(image)  # 2d Fourier transform for the images
    image_fourier = np.fft.fftshift(image_fourier)
    magnitude = np.abs(image_fourier)  # Magnitudes of the fourier sesries
    angle = np.angle(image_fourier)  # Phases of the fourier sesries

    # plot_magnitude_phase(magnitude, angle)

    return magnitude, angle
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#


# ------------------------------------------------------------------ Function description ------------------------------------------------------------------#
#   Arguments: magnitude and phase of the needed constructed image
#       Packages used : numpy package for multiplying the magnitude and phase : returns a numpy array of the image in shape
#                       take the real part of the series inversed to get the image constructed.
#   return: constructed image.
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#

def construct_image(magnitude, angle, filter, mode=1, **kwargs):
    flag = 0
    croped_magnitude = np.copy(magnitude)
    croped_angle = np.copy(angle)
    if mode:
        cropMag = kwargs['cropMag']
        cropPhase = kwargs['cropPhase']
        croped_magnitude = crop_2d_img(magnitude, cropMag, filter)
        croped_angle = crop_2d_img(angle, cropPhase, filter)
        if(cropPhase['height'] != 0 and cropPhase['width'] != 0):
            flag = 1

    combined = np.multiply(croped_magnitude, np.exp(
        np.multiply(1j, croped_angle)))
    # combined = np.fft.ifftshift(combined)
    image_combined = np.abs(np.fft.ifft2(combined))
    if flag:
        image_combined = cv2.equalizeHist(image_combined.astype(np.uint8))

    cv2.imwrite('../backend/files/images/result.png', image_combined)
    return image_combined
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#


def crop_2d_img(image, data, filter):
    if(data['height'] == 0 and data['width'] == 0) or (int(data['height']) == 100 and int(data['width'] == 100)):
        return image

    coordinates = points(data['x'], data['y'], data['width'], data['height'])
    if filter == 1:
        cutted_img = np.zeros_like(image)
    else:
        cutted_img = np.copy(image)

    if filter == 1:
        for x in range(int(coordinates[0]), int(coordinates[1])):
            for y in range(int(coordinates[2]), int(coordinates[3])):
                cutted_img[y, x] = image[y, x]
    else:
        for x in range(int(coordinates[0]), int(coordinates[1])):
            for y in range(int(coordinates[2]), int(coordinates[3])):
                cutted_img[y, x] = 0
    return cutted_img


def points(x_percentage, y_percentage, width, height):
    coordinates = []

    x_minimum = (x_percentage/100)*1400
    coordinates.append(x_minimum)
    x_maximum = ((x_percentage/100)*1400) + ((width/100)*1400)
    coordinates.append(x_maximum)

    y_minimum = (y_percentage/100)*1400
    coordinates.append(y_minimum)
    y_maximum = ((y_percentage/100)*1400) + ((height/100)*1400)
    coordinates.append(y_maximum)

    return coordinates
