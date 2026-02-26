import { useState } from "react";

export default function Profile({ user }) {

  const [editing, setEditing] = useState(false);

const storedProfile = JSON.parse(
  localStorage.getItem(`profile_${user?.email}`)
) || {};

const [profileData, setProfileData] = useState({
  name: user?.name || "",
  email: user?.email || "",
  phone: storedProfile.phone || "",
  bio: storedProfile.bio || "",
});

const [image, setImage] = useState(storedProfile.image || null);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

const handleSave = () => {
  const updatedProfile = {
    phone: profileData.phone,
    bio: profileData.bio,
    image: image,
  };

  localStorage.setItem(
    `profile_${user?.email}`,
    JSON.stringify(updatedProfile)
  );

  setEditing(false);
  alert("Profile Updated ✅");
};

  return (
    <div className="profile-card">

      <div className="profile-left">
        <img
          src={image || "https://via.placeholder.com/150"}
          alt="profile"
          className="profile-image"
        />

    {editing && (
  <input
    type="file"
    onChange={(e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }}
  />
)}
      </div>

      <div className="profile-right">
    <h2 style={{fontSize:"28px", marginBottom:"10px"}}>
  👤 My Profile
</h2>
<p style={{color:"#94a3b8"}}>
  Manage your personal information and career details
</p>

        <input
          name="name"
          value={profileData.name}
          disabled={!editing}
          onChange={handleChange}
        />

        <input
          name="email"
          value={profileData.email}
          disabled
        />

        <input
          name="phone"
          value={profileData.phone}
          disabled={!editing}
          onChange={handleChange}
          placeholder="Phone"
        />

        <textarea
          name="bio"
          value={profileData.bio}
          disabled={!editing}
          onChange={handleChange}
          placeholder="Bio"
        />

        {!editing ? (
          <button onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        ) : (
          <button onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}