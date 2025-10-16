import { LikedBody } from "@/modules/LikedBody";
import { BreadCrumb } from "@/shared/ui/components/BreadCrumb";

 const Liked = () => { 
  return(
    <div className="container m-auto">
      <BreadCrumb/>
      <LikedBody/>
    </div>
  )  
}

 export default Liked