import Gender from "../enums/gender";

interface MemberFaculty {
  id: string;
  name: string;
}

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  roles: string[];
  faculty: MemberFaculty;
  createdAt: Date;
  updatedAt: Date;
  v: number;
}

export default Member;
