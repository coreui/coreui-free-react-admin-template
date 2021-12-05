/* eslint-disable */
import React from 'react'
import { useDropzone } from 'react-dropzone'

export const Basic = (props) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <button className="my-btn">click to upload</button>
        <p style={{ marginTop: '20px' }}>Drag & drop multiple files to upload</p>
      </div>
      {/* <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside> */}
    </section>
  )
}

const MyDrag = <div>Hello</div>

export default MyDrag
