import Gender from "@/enums/gender";
import Province from "@/enums/province";

interface ProfileEditFormValues {
  indexNo: string;
  gender: Gender;
  facultyId: string;
  province: Province;
  school: string;
  v: number;
}

export default ProfileEditFormValues;