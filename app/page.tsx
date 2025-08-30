import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to login page as per requirements (1.1)
  redirect("/login");
}
