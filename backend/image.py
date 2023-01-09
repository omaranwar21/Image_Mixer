import numpy as np
import cv2


class Image:
    # constructor funtion
    def __init__(self, image_path, flag=1):
        print(image_path)
        self.image = cv2.imread(image_path, flag)
        self.image = cv2.resize(self.image, dsize=(1400, 1400))
        self.path = image_path

    def save(self):
        cv2.imwrite(self.path, self.image)


    def crop_2d(self, data, filter):
        if(data['height'] == 0 and data['width'] == 0) or (int(data['height']) == 100 and int(data['width'] == 100)):
            return self.image

        x = int((data['x']/100)*1200)
        y = int((data['y']/100)*1200)
        height = int((data['height']/100)*1200)
        width = int((data['width']/100)*1200)


        if filter == 1: #select inside
            cutted_img = np.zeros_like(self.image)
            cutted_img[y:y+height, x:x+width] = self.image[y:y+height, x:x+width]
        else: #select outside
            cutted_img = np.copy(self.image)
            cutted_img[y:y+height, x:x+width] = 0


        return cutted_img

    # def points(self, x_percentage, y_percentage, width, height):
    #     coordinates = []

    #     x_minimum = (x_percentage/100)*1400
    #     coordinates.append(x_minimum)
    #     x_maximum = ((x_percentage/100)*1400) + ((width/100)*1400)
    #     coordinates.append(x_maximum)

    #     y_minimum = (y_percentage/100)*1400
    #     coordinates.append(y_minimum)
    #     y_maximum = ((y_percentage/100)*1400) + ((height/100)*1400)
    #     coordinates.append(y_maximum)

    #     return coordinates


    def mapping(coordinates_list, difference, axis_percentage):
        axis_minimum = (axis_percentage/100)*1400
        coordinates_list.append(axis_minimum)
        axis_maximum = ((axis_percentage/100)*1400) + ((difference/100)*1400)
        coordinates_list.append(axis_maximum)