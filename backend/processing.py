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

# ------------------------------------------------------------------ Function description ------------------------------------------------------------------#
#   Arguments: Images paths
#       Packages used : CV2 package for reading an image : returns a numpy array of the image in shape (height, width, 3"BGR")
#       Functions called: magnitude_phase (user defined function returns the magnitude and phase respectively of an image passed)
#   return: magnitudes, phases of the first and second images respectively.
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#


def fourier_2D(first_image_path, second_image_path):

    # first image as gray scale (0) --> for gray scale
    first_image = cv2.imread(first_image_path, 0)
    # second_image = cv2.imread(second_image_path, 0) #second image as gray scale (0) --> for gray scale

    # Resizing for phase and magnitude extraction for the first image.
    first_image = cv2.resize(first_image, dsize=(1400, 1400))
    # second_image = cv2.resize(second_image, dsize = (1400, 1400)) # Resizing for phase and magnitude extraction for the second image.

    # calling user defined function to get magnitude and phase of the first image
    first_image_magnitude, first_image_phase = magnitude_phase(first_image)
    # second_image_magnitude, second_image_phase = magnitude_phase(second_image) # calling user defined function to get magnitude and phase of the first image

    return first_image_magnitude, first_image_phase
    # , second_image_magnitude, second_image_phase
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#

# ------------------------------------------------------------------ Function description ------------------------------------------------------------------#
#   Arguments: Image
#       Packages used : numpy package for fourier transform : returns a numpy array of the image in shape (height, width, 3"BGR")
#   return: magnitude and phase of the passed image respectively.
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#


def magnitude_phase(image):

    image_fourier = np.fft.fft2(image)  # 2d Fourier transform for the images
    magnitude = np.abs(image_fourier)  # Magnitudes of the fourier sesries
    phase = np.exp(1j*np.angle(image_fourier))  # Phases of the fourier sesries

    return magnitude, phase
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#


def plot_magnitude_phase(image_path):
    id = image_path.split()
    mag, phase = fourier_2D(image_path, image_path)
    inverse_mag = np.fft.ifft2(mag)
    plt.imshow(np.abs(np.log(inverse_mag)))
    plt.savefig('./files/magnitude')

# ------------------------------------------------------------------ Function description ------------------------------------------------------------------#
#   Arguments: magnitude and phase of the needed constructed image
#       Packages used : numpy package for multiplying the magnitude and phase : returns a numpy array of the image in shape
#                       take the real part of the series inversed to get the image constructed.
#   return: constructed image.
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#


def construct_image(magnitude, phase):

    combined = np.multiply(magnitude, phase)
    image_combined = np.real(np.fft.ifft2(combined))

    return image_combined
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#
