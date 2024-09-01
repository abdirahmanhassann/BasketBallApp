import React, { useContext, useEffect, useState } from "react";
import { NavContext } from "../../../../reusable/NavContext";

function EditProfile() {

    const { userInfo,selectedNav, setSelectedNav } = useContext(NavContext);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        gender: '',
        bio: '',
        phone: '',
        favourite_position: '',
        profilePic: '', // Initially no picture
      });
      const [errors, setErrors] = useState({});

      const token=localStorage.getItem('token')
      const handleFetchUserInfo = async () => {
        console.log('email:',userInfo.user.email)
        try {
          const response = await fetch('http://localhost:3000/allinfo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email:userInfo.user.email,token:token }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch user information');
          }
    
          const data = await response.json();
          setFormData(data[0]); 
          console.log(formData)
          // Assuming you only need the first match
        } catch (err) {
          console.error('Error:', err);
          setErrors('Failed to fetch user information');
        }
      };
useEffect(() => {
    handleFetchUserInfo()
},[])
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const validateForm = () => {
        const newErrors = {};
        if (!formData.gender) newErrors.gender = 'Please select your gender';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.favourite_position) newErrors.favourite_position = 'Please select your favourite position';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
          try {
            const response = await fetch('http://localhost:3000/settings/profile', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({formData,token:token}),
            });
      
            if (!response.ok) {
              throw new Error('Failed to update user information');
            }
      
            const data = await response.json();
            console.log('User information updated successfully:', data);
            // Optionally, show a success message or perform other actions
          } catch (error) {
            console.error('Error updating user information:', error);
          }
        }
      };
      
    
    return(
        <form className="settings-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Profile Picture</label>
          <div className="profile-pic-container">
            <img
              src={ '../../../stockImgs/userImg.png'}
              alt="Profile"
              className="profile-pic"
            />
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/*"
              onChange={(e) => setFormData({
                ...formData,
                profilePic: URL.createObjectURL(e.target.files[0]),
              })}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={formData.username}  />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <div className="gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              /> Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              /> Female
            </label>
          </div>
          {errors.gender && <span className="error-text">{errors.gender}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Tell us about yourself..."
            value={formData.bio}
            maxLength={100}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            minLength={11}
            maxLength={11}
            name="phone"
            placeholder="Update and verify your phone number"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="favourite_position">Favourite Position</label>
          <select
            id="favourite_position"
            name="favourite_position"
            value={formData.favourite_position}
            onChange={handleChange}
          >
            <option value="">Not set</option>
            <option value="Goalie">Goalie</option>
            <option value="Defender">Defender</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Forward">Forward</option>
          </select>
          {errors.favourite_position && <span className="error-text">{errors.favourite_position}</span>}
        </div>
        <button type="submit" className="submit-btn">Save Changes</button>
      </form>
    )
}   

export default EditProfile