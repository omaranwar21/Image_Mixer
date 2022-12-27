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
    phase = {}

# ------------------------------------------------------------------ Function description ------------------------------------------------------------------#
#   Arguments: Images paths
#   Packages used : CV2 package for reading an image : returns a numpy array of the image in shape (height, width, 3"BGR")
#   Functions called: magnitude_phase (user defined function returns the magnitude and phase respectively of an image passed)
#   return: magnitudes, phases of the first and second images respectively.
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#


def fourier_2D(image_path):
    # first image as gray scale (0) --> for gray scale
    image = cv2.imread(image_path, 0)
    # Resizing for phase and magnitude extraction for the first image.
    image = cv2.resize(image, dsize=(1400, 1400))
    # calling user defined function to get magnitude and phase of the first image
    image_magnitude, image_phase = magnitude_phase(image)

    return image_magnitude, image_phase
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#

# ------------------------------------------------------------------ Function description ------------------------------------------------------------------#
#   Arguments: Image
#   Packages used : numpy package for fourier transform : returns a numpy array of the image in shape (height, width, 3"BGR")
#   return: magnitude and phase of the passed image respectively.
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#


def magnitude_phase(image):

    image_fourier = np.fft.fft2(image)  # 2d Fourier transform for the images
    magnitude = np.abs(image_fourier)  # Magnitudes of the fourier sesries
    phase = np.exp(1j*np.angle(image_fourier))  # Phases of the fourier sesries

    return magnitude, phase
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#

# ------------------------------------------------------------------ Function description ------------------------------------------------------------------#
#   Arguments: Images path
#   Packages used : CV2 package for reading and writing the image : returns a numpy array of the image in shape (height, width, 3"BGR")
#   Functions called: resize the image and save it in the same path
#   return: void
#------------------------------------------------------------------------------------------------------------------------------------------------------------#


def resize_image(image_path):
    image = cv2.imread(image_path)
    image = cv2.resize(image, dsize=(1400, 1400))
    cv2.imwrite(image_path, image)
#------------------------------------------------------------------------------------------------------------------------------------------------------------#

# ------------------------------------------------------------------ Function description ------------------------------------------------------------------#
#   Arguments: Images path
#   Packages used : CV2 package for reading and writing the image : returns a numpy array of the image in shape (height, width, 3"BGR"),
#                   matplot.plotly for rendering the image and save it in the given path
#   Functions called: plot the magnitude & the phase and save it in the given path
#   return: void
#------------------------------------------------------------------------------------------------------------------------------------------------------------#


def plot_magnitude_phase(image_path):
    mag, phase = fourier_2D(image_path)
    db.magnitude['mag'+str(counter.imgId)] = mag
    db.phase['phase'+str(counter.imgId)] = phase
    inverse_mag = np.fft.ifft2(mag)
    inverse_phase = np.fft.ifft2(phase)
    plt.imshow(np.abs(np.log(inverse_mag)), cmap="gray")
    plt.savefig('./files/images/mag'+str(counter.imgId))
    plt.clf()
    plt.imshow(np.abs(np.log(inverse_phase)), cmap="gray")
    plt.savefig('./files/images/phase'+str(counter.imgId))

# ------------------------------------------------------------------ Function description ------------------------------------------------------------------#
#   Arguments: magnitude and phase of the needed constructed image
#       Packages used : numpy package for multiplying the magnitude and phase : returns a numpy array of the image in shape
#                       take the real part of the series inversed to get the image constructed.
#   return: constructed image.
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#


def construct_image(magnitude, phase):

    combined = np.multiply(magnitude, phase)
    image_combined = np.real(np.fft.ifft2(combined))
    cv2.imwrite("./files/images/result.png", image_combined)
    # return image_combined
#-----------------------------------------------------------------------------------------------------------------------------------------------------------#


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

def crop_2d_img(image,coordinates):
    
    max_height= image.shape[0]-1
    cutted_img = np.zeros_like(image)

    for x in range(int(coordinates[0]),int(coordinates[1])):
        for y in range(int(coordinates[2]),int(coordinates[3])):
            cutted_img[max_height-y,x] = image[max_height-y,x]
    return cutted_img