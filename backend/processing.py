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
    croped_magnitude = np.copy(magnitude)
    croped_angle = np.copy(angle)
    if mode: #crop in mag or phase
        cropMag = kwargs['cropMag']
        cropPhase = kwargs['cropPhase']
        croped_magnitude = crop_2d_img(magnitude, cropMag, filter)
        croped_angle = crop_2d_img(angle, cropPhase, filter)

    combined = np.multiply(croped_magnitude, np.exp(
        np.multiply(1j, croped_angle)))
    combined = np.fft.ifftshift(combined)
    image_combined = np.abs(np.fft.ifft2(combined))
    image_combined = cv2.equalizeHist(image_combined.astype(np.uint8))

    cv2.imwrite('../backend/files/images/result.png', image_combined)
    return image_combined
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#


def crop_2d_img(image, data, filter):
    if(data['height'] == 0 and data['width'] == 0) or (int(data['height']) == 100 and int(data['width'] == 100)):
        return image  

    x = int((data['x']/100)*1200)
    y = int((data['y']/100)*1200)
    height = int((data['height']/100)*1200)
    width = int((data['width']/100)*1200)


    if filter == 1: # select inside
        cutted_img = np.zeros_like(image)
        cutted_img[y:y+height, x:x+width] = image[y:y+height, x:x+width]
    else: # select outside
        cutted_img = np.copy(image)
        cutted_img[y:y+height, x:x+width] = 0

    return cutted_img

