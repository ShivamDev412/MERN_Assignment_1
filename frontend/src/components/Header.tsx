import { ModeToggle } from "./ModeToggle";

const Header = () => {
  return (
    <header className="py-4 bg-white border-b border-gray-300 dark:bg-[#020817]">
      <div className="w-[90%] 2xl:w-[80%] mx-auto flex justify-between relative">
        <div className="w-[10rem] h-fit">
          <a href="/">
            <img src="../logo.svg" alt="" className="h-full w-full" />
          </a>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
