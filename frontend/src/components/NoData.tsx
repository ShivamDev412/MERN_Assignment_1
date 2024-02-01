const NoData = ({ title }: { title: string }) => {
  return (
    <div className="w-full h-auto flex justify-center items-center">
      <p className="text-center text-2xl">No {title} found.</p>
    </div>
  );
};

export default NoData;
