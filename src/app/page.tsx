import FriendsList from "@/components/friends-list";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">My Friends List</h1>
      <FriendsList />
    </main>
  );
}
