import numpy as np
import cv2


class Image:
    # constructor funtion
    def __init__(self, id, image_path, flag=1):
        self.image = cv2.imread(image_path, flag)
        self.image = cv2.resize(self.image, dsize=(1400, 1400))
        self.id = id

    def crop_2d(self,data, filter):
        if(data['height'] == 0 and data['width'] == 0):
            return self.image

        coordinates = self.points(data['x'], data['y'], data['width'], data['height'])
        if filter == 1:
            cutted_img = np.zeros_like(self.image)
        else:
            cutted_img = self.image
            

        for x in range(int(coordinates[0]), int(coordinates[1])):
            for y in range(int(coordinates[2]), int(coordinates[3])):
                if filter == 1:
                    cutted_img[y, x] = self.image[y, x]
                else:
                    cutted_img[y, x] = 0

        return cutted_img

    def points(self,x_percentage, y_percentage, width, height):
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
