import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const ROW_DATA = [
  {
    profile: "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
    id: 1,
    name: "John Doe",
    email: "jdoe1@example.com",
    status: "Active",
    role: "Admin",
  },
  {
    profile: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
    id: 2,
    name: "Jane Smith",
    email: "jsmith2@mail.com",
    status: "Inactive",
    role: "User",
  },
  {
    profile: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
    id: 3,
    name: "Alice Johnson",
    email: "ajohnson3@test.com",
    status: "Pending",
    role: "Editor",
  },
  {
    profile: "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
    id: 4,
    name: "Michael Brown",
    email: "mbrown4@demo.com",
    status: "Active",
    role: "Viewer",
  },
  {
    profile: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    id: 5,
    name: "Emily Davis",
    email: "edavis5@example.com",
    status: "Active",
    role: "User",
  },
  {
    profile: "https://flowbite.com/docs/images/people/profile-picture-6.jpg",
    id: 6,
    name: "Chris Wilson",
    email: "cwilson6@example.com",
    status: "Inactive",
    role: "Admin",
  },
  {
    profile: "https://flowbite.com/docs/images/people/profile-picture-7.jpg",
    id: 7,
    name: "Sarah Taylor",
    email: "staylor7@mail.com",
    status: "Pending",
    role: "Editor",
  },
  {
    profile: "https://flowbite.com/docs/images/people/profile-picture-8.jpg",
    id: 8,
    name: "Daniel Thomas",
    email: "dthomas8@test.com",
    status: "Active",
    role: "Viewer",
  },
  {
    profile: "https://flowbite.com/docs/images/people/profile-picture-9.jpg",
    id: 9,
    name: "Sophia Martinez",
    email: "smartinez9@demo.com",
    status: "Inactive",
    role: "User",
  },
  {
    profile: "https://flowbite.com/docs/images/people/profile-picture-10.jpg",
    id: 10,
    name: "James Anderson",
    email: "janderson10@example.com",
    status: "Pending",
    role: "Admin",
  },
  {
    profile: "https://flowbite.com/docs/images/people/profile-picture-11.jpg",
    id: 11,
    name: "Olivia Garcia",
    email: "ogarcia11@mail.com",
    status: "Active",
    role: "Editor",
  },
  {
    profile: "https://flowbite.com/docs/images/people/profile-picture-12.jpg",
    id: 12,
    name: "Ethan Moore",
    email: "emoore12@test.com",
    status: "Inactive",
    role: "Viewer",
  },
];

export const ROW_COLUMNS = [
  columnHelper.accessor("profile", {
    header: "Profile",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => info.getValue(),
    filterFn: "customFilterRole", // Assign the custom filter function here
  }),
];
