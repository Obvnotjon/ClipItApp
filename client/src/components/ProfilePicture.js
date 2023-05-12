import { Image } from "react-bootstrap";

function ProfilePicture({src, alt}) {
    return (
        <Image src={src} alt ={alt}
        roundedCircle style={{ width: '125px', height: '125px', objectFit: 'cover', border: "2px solid #292929" }}/>
    );

}

export default ProfilePicture;