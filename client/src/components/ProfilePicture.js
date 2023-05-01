import { Image } from "react-bootstrap";

function ProfilePicture({src, alt}) {
    return (
        <Image src={src} alt ={alt}
        roundedCircle style={{ width: '120px', height: '120px', objectFit: 'cover'}}/>
    );

}

export default ProfilePicture;