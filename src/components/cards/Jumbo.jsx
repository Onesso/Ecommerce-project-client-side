//using props which have diconstructed to enhance reusability and dynamic, the second prop is defined with a default value

export default function Jumbo({
  title,
  subTitle = "Welcome to E-Biashara Excel",
}) {
  return (
    <>
      <div className="container-fluid jumbo">
        <div className="row">
          <div className="col text-center align-items-center p-3.5 ">
            <h1 className="pt-3">{title}</h1>
            <p className="lead">{subTitle}</p>
          </div>
        </div>
      </div>
    </>
  );
}
