const CustomNextArrow = (props) => (
  <div className="slick-arrow-next" onClick={props.onClick}>
    <span className="th-dots th-arrow-right th-dots-animated">
      <span />
      <span />
      <span />
    </span>
  </div>
);

export default CustomNextArrow;