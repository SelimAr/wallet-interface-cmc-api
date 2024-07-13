import SideBar from "./components/SideBar";
import Container from "./components/Container";

export default async function Home() {
  return (
    <main className="p-5 flex space-x-5">
      <SideBar />
      <Container />
    </main>
  );
}
