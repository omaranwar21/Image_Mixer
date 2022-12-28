#---------------------------------------------------------------------- Packages used ----------------------------------------------------------------------#
import numpy as np
import cv2
import matplotlib
import matplotlib.pyplot as plt
matplotlib.use('Agg')
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#

# the id of the image that be saved


class counter:
    imgId = 0


class db:
    magnitude = {}
    angle = {}

# ------------------------------------------------------------------ Function description ------------------------------------------------------------------#
#   Arguments: Images paths
#   Packages used : CV2 package for reading an image : returns a numpy array of the image in shape (height, width, 3"BGR")
#   Functions called: magnitude_phase (user defined function returns the magnitude and phase respectively of an image passed)
#   return: magnitudes, phases of the first and second images respectively.
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#

def fourier_2D(image_path):
    image = resize_image(image_path, 0)
    # calling user defined function to get magnitude and phase of the first image
    image_magnitude, image_angle = magnitude_angle(image)

    return image_magnitude, image_angle
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#

# ------------------------------------------------------------------ Function description ------------------------------------------------------------------#
#   Arguments: Image
#   Packages used : numpy package for fourier transform : returns a numpy array of the image in shape (height, width, 3"BGR")
#   return: magnitude and phase of the passed image respectively.
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#


def magnitude_angle(image):

    image_fourier = np.fft.fft2(image)  # 2d Fourier transform for the images
    image_fourier = np.fft.fftshift(image_fourier)
    magnitude = np.abs(image_fourier)  # Magnitudes of the fourier sesries
    angle = np.angle(image_fourier) # Phases of the fourier sesries

    plot_magnitude_phase(magnitude, angle)

    return magnitude, angle
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#

# ------------------------------------------------------------------ Function description ------------------------------------------------------------------#
#   Arguments: Images path
#   Packages used : CV2 package for reading and writing the image : returns a numpy array of the image in shape (height, width, 3"BGR")
#   Functions called: resize the image and save it in the same path
#   return: void
#------------------------------------------------------------------------------------------------------------------------------------------------------------#


def resize_image(image_path, flag = 1):
    if flag:
        image = cv2.imread(image_path)
    else:
        image = cv2.imread(image_path, flag)
    image = cv2.resize(image, dsize=(1400, 1400))
    cv2.imwrite(image_path, image)

    return image
#------------------------------------------------------------------------------------------------------------------------------------------------------------#

# ------------------------------------------------------------------ Function description ------------------------------------------------------------------#
#   Arguments: Images path
#   Packages used : CV2 package for reading and writing the image : returns a numpy array of the image in shape (height, width, 3"BGR"),
#                   matplot.plotly for rendering the image and save it in the given path
#   Functions called: plot the magnitude & the phase and save it in the given path
#   return: void
#------------------------------------------------------------------------------------------------------------------------------------------------------------#


def plot_magnitude_phase(mag, angle):
    phase = np.exp(1j*angle)
    db.magnitude['mag'+str(counter.imgId)] = mag
    db.angle['phase'+str(counter.imgId)] = angle
    inverse_mag = np.fft.ifft2(mag)
    inverse_phase = np.fft.ifft2(phase)
    plt.axis('off')
    plt.imshow(np.abs(np.log(inverse_mag)), cmap="gray")
    plt.savefig('./files/images/mag'+str(counter.imgId), bbox_inches= 'tight')
    plt.clf()
    plt.axis('off')
    plt.imshow(np.abs(np.log(inverse_phase)), cmap="gray")
    plt.savefig('./files/images/phase'+str(counter.imgId), bbox_inches= 'tight')

# ------------------------------------------------------------------ Function description ------------------------------------------------------------------#
#   Arguments: magnitude and phase of the needed constructed image
#       Packages used : numpy package for multiplying the magnitude and phase : returns a numpy array of the image in shape
#                       take the real part of the series inversed to get the image constructed.
#   return: constructed image.
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#


def construct_image(magnitude, angle, id):

    combined = np.multiply(magnitude, angle)
    combined = np.fft.ifftshift(combined)
    image_combined = np.real(np.fft.ifft2(combined))
    if id:
        cv2.imwrite("./files/images/result.png", image_combined)
    return image_combined
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#



def crop_2d_img(image, x_percentage, y_percentage, width, height):
    coordinates = points(x_percentage, y_percentage, width, height)
    max_height= image.shape[0]-1
    cutted_img = np.zeros_like(image)

    for x in range(int(coordinates[0]),int(coordinates[1])):
        for y in range(int(coordinates[2]),int(coordinates[3])):
            cutted_img[max_height-y,x] = image[max_height-y,x]
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