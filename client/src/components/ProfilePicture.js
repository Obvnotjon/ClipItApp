import { Image } from "react-bootstrap";

function ProfilePicture({src, alt}) {
    return (
        <Image src={src} alt ={alt}
        roundedCircle style={{ width: '140px', height: '140px', objectFit: 'cover'}}/>
    );

}

export default ProfilePicture;