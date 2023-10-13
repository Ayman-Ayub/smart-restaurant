import React, { useEffect, useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Carousel from 'better-react-carousel';
import { useVehicleQuery } from '../../../customHooks/useQuery/vehicle';
const Gallery = ({ lotNumber }) => {
    const vehicleQuery = useVehicleQuery({ lot: lotNumber });

    const [currentImage, setCurrentImage] = useState(
        vehicleQuery.data?.vehicleImages?.detailed ? vehicleQuery.data?.vehicleImages?.detailed[0]?.url : null,
    );

    return (
        <>
            {currentImage && (
                <>
                    <InnerImageZoom src={currentImage} />
                    <Carousel cols={5} rows={2} gap={5} loop>
                        {vehicleQuery.data?.vehicleImages?.detailed?.map((image, index) => (
                            <Carousel.Item key={`vehicle-detailed-image-${index}`}>
                                <img onClick={() => setCurrentImage(image.url)} src={image.url} className="w-100" />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </>
            )}
        </>
    );
};

export default Gallery;
