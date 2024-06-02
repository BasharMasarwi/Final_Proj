import multer from "multer";

export const fileType =   {
    image:['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    pdf :['application/pdf']
};
function fileUpload(customTypes = []) {
 
    const storage = multer.diskStorage({
        
    })
    function fileFilter(req, file, cb) {
        if(customTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb("invalid file", false);
        }
    }
    const upload = multer({fileFilter , storage});
    return upload;
}
export default fileUpload;