import Gender from "../enums/gender";

interface MemberFaculty {
  id: string;
  name: string;
}

interface Member {
  id: string;
  userId: string;
  gender: Gender;
  faculty: MemberFaculty;
  createdAt: Date;
  updatedAt: Date;
  v: number;
}

export default Member;
