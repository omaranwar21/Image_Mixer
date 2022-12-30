import numpy as np
import cv2

class image:
    # constructor funtion
    def __init__(self,image_path,flag = 1):
        self.image = cv2.imread(image_path,flag)


    def resize(self):
        self.image = cv2.resize(self.image, dsize=(1400, 1400))


    def crop_2d (self, x_percentage, y_percentage, width, height):
        coordinates = self.points(x_percentage, y_percentage, width, height)
        max_height = self.image.shape[0]-1
        cutted_img = np.zeros_like(self.image)

        for x in range(int(coordinates[0]), int(coordinates[1])):
            for y in range(int(coordinates[2]), int(coordinates[3])):
                cutted_img[max_height-y, x] = self.image[max_height-y, x]
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