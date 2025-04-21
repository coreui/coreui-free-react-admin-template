// helpers/layerCreation.js
import ImageLayer from 'ol/layer/Image'
import { ImageWMS } from 'ol/source'
import { WMS_URL } from '../utils/constants';

export const createWMSLayer = (layerName, layerColor = '#3388ff', zIndex = 1, minZoom, maxZoom ) => {
  const token = localStorage.getItem('token')
  const sldBody = `
    <StyledLayerDescriptor version="1.0.0">
        <NamedLayer>
            <Name>${layerName}</Name>
            <UserStyle>
                <FeatureTypeStyle>
                    <Rule>
                        <PolygonSymbolizer>
                            <Fill>
                                <CssParameter name="fill">${layerColor}</CssParameter>
                                <CssParameter name="fill-opacity">0.5</CssParameter>
                            </Fill>
                            <Stroke>
                                <CssParameter name="stroke">#000000</CssParameter>
                                <CssParameter name="stroke-width">1</CssParameter>
                            </Stroke>
                        </PolygonSymbolizer>
                    </Rule>
                </FeatureTypeStyle>
            </UserStyle>
        </NamedLayer>
    </StyledLayerDescriptor>
  `.replace(/\s+/g, ' ');

  const wmsSource = new ImageWMS({
    url: `${WMS_URL}/${layerName}`,
    params: {
      TRANSPARENT: true,
      SLD_BODY: sldBody,
    },
    serverType: 'geoserver',
    ratio: 1,
    imageLoadFunction: (image, src) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', src, true);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.responseType = 'blob';
      xhr.onload = function () {
        if (xhr.status === 200) {
          const img = image.getImage();
          img.src = URL.createObjectURL(xhr.response);
          img.onerror = function() {
            console.warn(`Failed to load image for layer ${layerName}`);
            wmsSource.dispatchEvent('imageloadend');
          };
          
          img.onload = function() {
            wmsSource.dispatchEvent('imageloadend');
          };
        } else {
          console.error(`HTTP error loading WMS layer ${layerName}: ${xhr.status}`);
          wmsSource.dispatchEvent('imageloadend');
        }
      };
      xhr.onerror = function() {
        console.error(`Network error loading WMS layer ${layerName}`);
        wmsSource.dispatchEvent('imageloadend');
      };
      xhr.send();
    },
  });

  const layer = new ImageLayer({
    source: wmsSource,
    opacity: 0.8,
    zIndex: zIndex,
    visible: true,
    minZoom: minZoom,
    maxZoom: maxZoom,
  });

  return layer;
};