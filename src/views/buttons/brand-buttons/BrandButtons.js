import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const BrandButtons = () => {
  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>
            Brand button
          </CCardHeader>
          <CCardBody>
            <h6>Size Small
              <small> <code>size="sm"</code></small>
            </h6>
            <p>
              <CButton size="sm" className="btn-facebook btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-facebook" /><span className="mfs-2">Facebook</span></CButton>
              <CButton size="sm" className="btn-twitter btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-twitter" /><span className="mfs-2">Twitter</span></CButton>
              <CButton size="sm" className="btn-linkedin btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-linkedin" /><span className="mfs-2">LinkedIn</span></CButton>
              <CButton size="sm" className="btn-flickr btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-flickr" /><span className="mfs-2">Flickr</span></CButton>
              <CButton size="sm" className="btn-tumblr btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-tumblr" /><span className="mfs-2">Tumblr</span></CButton>
              <CButton size="sm" className="btn-xing btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-xing" /><span className="mfs-2">Xing</span></CButton>
              <CButton size="sm" className="btn-github btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-github" /><span className="mfs-2">Github</span></CButton>
              <CButton size="sm" className="btn-stack-overflow btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-stackoverflow" /><span className="mfs-2">StackOverflow</span></CButton>
              <CButton size="sm" className="btn-youtube btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-youtube" /><span className="mfs-2">YouTube</span></CButton>
              <CButton size="sm" className="btn-dribbble btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-dribbble" /><span className="mfs-2">Dribbble</span></CButton>
              <CButton size="sm" className="btn-instagram btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-instagram" /><span className="mfs-2">Instagram</span></CButton>
              <CButton size="sm" className="btn-pinterest btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-pinterest" /><span className="mfs-2">Pinterest</span></CButton>
              <CButton size="sm" className="btn-vk btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-vk" /><span className="mfs-2">VK</span></CButton>
              <CButton size="sm" className="btn-yahoo btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-yahoo" /><span className="mfs-2">Yahoo</span></CButton>
              <CButton size="sm" className="btn-behance btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-behance" /><span className="mfs-2">Behance</span></CButton>
              <CButton size="sm" className="btn-reddit btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-reddit" /><span className="mfs-2">Reddit</span></CButton>
              <CButton size="sm" className="btn-vimeo btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-vimeo" /><span className="mfs-2">Vimeo</span></CButton>
            </p>
            <h6>Size Normal</h6>
            <p>
              <CButton className="btn-facebook btn-brand mr-1 mb-1"><CIcon name="cib-facebook" /><span className="mfs-2">Facebook</span></CButton>
              <CButton className="btn-twitter btn-brand mr-1 mb-1"><CIcon name="cib-twitter" /><span className="mfs-2">Twitter</span></CButton>
              <CButton className="btn-linkedin btn-brand mr-1 mb-1"><CIcon name="cib-linkedin" /><span className="mfs-2">LinkedIn</span></CButton>
              <CButton className="btn-flickr btn-brand mr-1 mb-1"><CIcon name="cib-flickr" /><span className="mfs-2">Flickr</span></CButton>
              <CButton className="btn-tumblr btn-brand mr-1 mb-1"><CIcon name="cib-tumblr" /><span className="mfs-2">Tumblr</span></CButton>
              <CButton className="btn-xing btn-brand mr-1 mb-1"><CIcon name="cib-xing" /><span className="mfs-2">Xing</span></CButton>
              <CButton className="btn-github btn-brand mr-1 mb-1"><CIcon name="cib-github" /><span className="mfs-2">Github</span></CButton>
              <CButton className="btn-stack-overflow btn-brand mr-1 mb-1"><CIcon name="cib-stackoverflow" /><span className="mfs-2">StackOverflow</span></CButton>
              <CButton className="btn-youtube btn-brand mr-1 mb-1"><CIcon name="cib-youtube" /><span className="mfs-2">YouTube</span></CButton>
              <CButton className="btn-dribbble btn-brand mr-1 mb-1"><CIcon name="cib-dribbble" /><span className="mfs-2">Dribbble</span></CButton>
              <CButton className="btn-instagram btn-brand mr-1 mb-1"><CIcon name="cib-instagram" /><span className="mfs-2">Instagram</span></CButton>
              <CButton className="btn-pinterest btn-brand mr-1 mb-1"><CIcon name="cib-pinterest" /><span className="mfs-2">Pinterest</span></CButton>
              <CButton className="btn-vk btn-brand mr-1 mb-1"><CIcon name="cib-vk" /><span className="mfs-2">VK</span></CButton>
              <CButton className="btn-yahoo btn-brand mr-1 mb-1"><CIcon name="cib-yahoo" /><span className="mfs-2">Yahoo</span></CButton>
              <CButton className="btn-behance btn-brand mr-1 mb-1"><CIcon name="cib-behance" /><span className="mfs-2">Behance</span></CButton>
              <CButton className="btn-reddit btn-brand mr-1 mb-1"><CIcon name="cib-reddit" /><span className="mfs-2">Reddit</span></CButton>
              <CButton className="btn-vimeo btn-brand mr-1 mb-1"><CIcon name="cib-vimeo" /><span className="mfs-2">Vimeo</span></CButton>
            </p>
            <h6>Size Large
              <small> <code>size="lg"</code></small>
            </h6>
            <p>
              <CButton size="lg" className="btn-facebook btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-facebook" /><span className="mfs-2">Facebook</span></CButton>
              <CButton size="lg" className="btn-twitter btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-twitter" /><span className="mfs-2">Twitter</span></CButton>
              <CButton size="lg" className="btn-linkedin btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-linkedin" /><span className="mfs-2">LinkedIn</span></CButton>
              <CButton size="lg" className="btn-flickr btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-flickr" /><span className="mfs-2">Flickr</span></CButton>
              <CButton size="lg" className="btn-tumblr btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-tumblr" /><span className="mfs-2">Tumblr</span></CButton>
              <CButton size="lg" className="btn-xing btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-xing" /><span className="mfs-2">Xing</span></CButton>
              <CButton size="lg" className="btn-github btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-github" /><span className="mfs-2">Github</span></CButton>
              <CButton size="lg" className="btn-stack-overflow btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-stackoverflow" /><span className="mfs-2">StackOverflow</span></CButton>
              <CButton size="lg" className="btn-youtube btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-youtube" /><span className="mfs-2">YouTube</span></CButton>
              <CButton size="lg" className="btn-dribbble btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-dribbble" /><span className="mfs-2">Dribbble</span></CButton>
              <CButton size="lg" className="btn-instagram btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-instagram" /><span className="mfs-2">Instagram</span></CButton>
              <CButton size="lg" className="btn-pinterest btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-pinterest" /><span className="mfs-2">Pinterest</span></CButton>
              <CButton size="lg" className="btn-vk btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-vk" /><span className="mfs-2">VK</span></CButton>
              <CButton size="lg" className="btn-yahoo btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-yahoo" /><span className="mfs-2">Yahoo</span></CButton>
              <CButton size="lg" className="btn-behance btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-behance" /><span className="mfs-2">Behance</span></CButton>
              <CButton size="lg" className="btn-reddit btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-reddit" /><span className="mfs-2">Reddit</span></CButton>
              <CButton size="lg" className="btn-vimeo btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-vimeo" /><span className="mfs-2">Vimeo</span></CButton>
            </p>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs="12">
        <CCard>
          <CCardHeader>
            Brand button
            <small> only icons</small>
          </CCardHeader>
          <CCardBody>
            <h6>Size Small
              <small> <code>size="sm"</code></small>
            </h6>
            <p>
              <CButton size="sm" className="btn-facebook btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-facebook" /></CButton>
              <CButton size="sm" className="btn-twitter btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-twitter" /></CButton>
              <CButton size="sm" className="btn-linkedin btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-linkedin" /></CButton>
              <CButton size="sm" className="btn-flickr btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-flickr" /></CButton>
              <CButton size="sm" className="btn-tumblr btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-tumblr" /></CButton>
              <CButton size="sm" className="btn-xing btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-xing" /></CButton>
              <CButton size="sm" className="btn-github btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-github" /></CButton>
              <CButton size="sm" className="btn-stack-overflow btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-stackoverflow" /></CButton>
              <CButton size="sm" className="btn-youtube btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-youtube" /></CButton>
              <CButton size="sm" className="btn-dribbble btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-dribbble" /></CButton>
              <CButton size="sm" className="btn-instagram btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-instagram" /></CButton>
              <CButton size="sm" className="btn-pinterest btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-pinterest" /></CButton>
              <CButton size="sm" className="btn-vk btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-vk" /></CButton>
              <CButton size="sm" className="btn-yahoo btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-yahoo" /></CButton>
              <CButton size="sm" className="btn-behance btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-behance" /></CButton>
              <CButton size="sm" className="btn-reddit btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-reddit" /></CButton>
              <CButton size="sm" className="btn-vimeo btn-brand mr-1 mb-1"><CIcon size="sm" name="cib-vimeo" /></CButton>
            </p>
            <h6>Size Normal</h6>
            <p>
              <CButton className="btn-facebook btn-brand mr-1 mb-1"><CIcon name="cib-facebook" /></CButton>
              <CButton className="btn-twitter btn-brand mr-1 mb-1"><CIcon name="cib-twitter" /></CButton>
              <CButton className="btn-linkedin btn-brand mr-1 mb-1"><CIcon name="cib-linkedin" /></CButton>
              <CButton className="btn-flickr btn-brand mr-1 mb-1"><CIcon name="cib-flickr" /></CButton>
              <CButton className="btn-tumblr btn-brand mr-1 mb-1"><CIcon name="cib-tumblr" /></CButton>
              <CButton className="btn-xing btn-brand mr-1 mb-1"><CIcon name="cib-xing" /></CButton>
              <CButton className="btn-github btn-brand mr-1 mb-1"><CIcon name="cib-github" /></CButton>
              <CButton className="btn-stack-overflow btn-brand mr-1 mb-1"><CIcon name="cib-stackoverflow" /></CButton>
              <CButton className="btn-youtube btn-brand mr-1 mb-1"><CIcon name="cib-youtube" /></CButton>
              <CButton className="btn-dribbble btn-brand mr-1 mb-1"><CIcon name="cib-dribbble" /></CButton>
              <CButton className="btn-instagram btn-brand mr-1 mb-1"><CIcon name="cib-instagram" /></CButton>
              <CButton className="btn-pinterest btn-brand mr-1 mb-1"><CIcon name="cib-pinterest" /></CButton>
              <CButton className="btn-vk btn-brand mr-1 mb-1"><CIcon name="cib-vk" /></CButton>
              <CButton className="btn-yahoo btn-brand mr-1 mb-1"><CIcon name="cib-yahoo" /></CButton>
              <CButton className="btn-behance btn-brand mr-1 mb-1"><CIcon name="cib-behance" /></CButton>
              <CButton className="btn-reddit btn-brand mr-1 mb-1"><CIcon name="cib-reddit" /></CButton>
              <CButton className="btn-vimeo btn-brand mr-1 mb-1"><CIcon name="cib-vimeo" /></CButton>
            </p>
            <h6>Size Large
              <small> <code>size="lg"</code></small>
            </h6>
            <p>
              <CButton size="lg" className="btn-facebook btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-facebook" /></CButton>
              <CButton size="lg" className="btn-twitter btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-twitter" /></CButton>
              <CButton size="lg" className="btn-linkedin btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-linkedin" /></CButton>
              <CButton size="lg" className="btn-flickr btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-flickr" /></CButton>
              <CButton size="lg" className="btn-tumblr btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-tumblr" /></CButton>
              <CButton size="lg" className="btn-xing btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-xing" /></CButton>
              <CButton size="lg" className="btn-github btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-github" /></CButton>
              <CButton size="lg" className="btn-stack-overflow btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-stackoverflow" /></CButton>
              <CButton size="lg" className="btn-youtube btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-youtube" /></CButton>
              <CButton size="lg" className="btn-dribbble btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-dribbble" /></CButton>
              <CButton size="lg" className="btn-instagram btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-instagram" /></CButton>
              <CButton size="lg" className="btn-pinterest btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-pinterest" /></CButton>
              <CButton size="lg" className="btn-vk btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-vk" /></CButton>
              <CButton size="lg" className="btn-yahoo btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-yahoo" /></CButton>
              <CButton size="lg" className="btn-behance btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-behance" /></CButton>
              <CButton size="lg" className="btn-reddit btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-reddit" /></CButton>
              <CButton size="lg" className="btn-vimeo btn-brand mr-1 mb-1"><CIcon size="lg" name="cib-vimeo" /></CButton>
            </p>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default BrandButtons
