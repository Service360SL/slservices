import Pagination from "react-bootstrap/Pagination";

function PageNumber() {
  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item >{1}</Pagination.Item>

      <Pagination.Item>{2}</Pagination.Item>
      <Pagination.Item>{3}</Pagination.Item>
      <Pagination.Item >{4}</Pagination.Item>
      <Pagination.Item>{5}</Pagination.Item>


      {/* <Pagination.Ellipsis /> */}
      <Pagination.Item>{6}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
}

export default PageNumber;