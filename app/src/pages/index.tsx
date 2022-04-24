import DefaultLayout from "@/components/DefaultLayout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <div className="artboard phone-1">
        <button className="py-2 px-6 btn">Button UI</button>
      </div>
    </DefaultLayout>
  );
};

export default Home;
