import { Image } from "react-bootstrap";

function ProfilePicture({ src, alt}) {
    return (
        <Image src={src} alt ={alt}
        roundedCircle style={{ width: '70px', height: '70px', objectFit: 'cover'}}/>
    );

}

export default ProfilePicture;