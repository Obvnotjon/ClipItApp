import { Image } from "react-bootstrap";

function PostPfp({src, alt}) {
    return (
        <Image src={src} alt ={alt}
        roundedCircle style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: "12px", border: "1px solid #292929"}}/>
    );
}

export default PostPfp;