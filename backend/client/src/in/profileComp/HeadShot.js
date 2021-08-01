import React from 'react';

export default ({imagePreviewUrl,handleImageChange}) => { 
    return (
        <div id="Profile_userimage_container" className="mt-3">
            <div className="d-flex justify-content-center">
                <img
                    src={imagePreviewUrl}
                    id="Profile_userimage"
                    className="img-fluid"
                />
            </div>
            <label
            id="Profile_userimage_change"
            className="mt-2 d-flex justify-content-center"
            >
                <input
                    type="file"
                    id="Profile_head_shot"
                    onChange={handleImageChange}
                    name="userimage"
                    accept="image/*"
                    style={{ display: "none" }}
                />
                <span id="Profile_addImage_icon">
                    ➕<p style={{ display: "inline" }}>Add Head Shot</p>
                </span>
            </label>
        </div>
    )
}