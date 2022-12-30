from image import *
import matplotlib
import matplotlib.pyplot as plt
matplotlib.use('Agg')

from processing import counter,db


class FFT_Image(Image):
    
    def __init__(self, id, image_path, flag=1):
        super().__init__(id, image_path, flag)
        

    def fourier_2D(self):
        # calling user defined function to get magnitude and phase of the first image
        self.magnitude, self.angle = self.magnitude_angle()


    def magnitude_angle(self):
        image_fourier = np.fft.fft2(self.image)  # 2d Fourier transform for the images
        image_fourier = np.fft.fftshift(image_fourier)
        magnitude = np.abs(image_fourier)  # Magnitudes of the fourier sesries
        angle = np.angle(image_fourier)  # Phases of the fourier sesries

        self.plot_magnitude_phase(magnitude, angle)

        return magnitude, angle


    def plot_magnitude_phase(self, mag, angle):
        phase = np.exp(1j*angle)
        # db.magnitude['mag'+str(counter.imgId)] = mag
        # db.angle['angle'+str(counter.imgId)] = angle
        inverse_mag = np.fft.ifft2(mag)
        inverse_phase = np.fft.ifft2(phase)
        plt.axis('off')
        plt.imshow(np.abs(np.log(inverse_mag)), cmap="gray")
        plt.savefig('./files/images/mag'+str(counter.imgId), bbox_inches='tight')
        plt.clf()
        plt.axis('off')
        plt.imshow(np.abs(np.log(inverse_phase)), cmap="gray")
        plt.savefig('./files/images/phase'+str(counter.imgId), bbox_inches='tight')
