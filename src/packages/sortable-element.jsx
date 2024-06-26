import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
const style = {
  position:"relative",
  padding: "0.5rem 1rem",
  cursor: "pointer",
  };

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { findDOMNode } from 'react-dom';
// import { DragSource, DropTarget } from 'react-dnd';
// import ItemTypes from './ItemTypes';

// const cardSource = {
//   beginDrag(props) {
//     return {
//       itemType: ItemTypes.CARD,
//       id: props.id,
//       index: props.index,
//       data:props.data
//     };
//   },
// };

// const cardTarget = {
//   drop(
//     props,
//     monitor,
//     component,
//   ) {
//     if (!component) {
//       return;
//     }

//     const item = monitor.getItem();
//     const hoverIndex = props.index;
//     const dragIndex = item.index;

//     if ((props.data && props.data.isContainer) || item.itemType === ItemTypes.CARD) {
//       // console.log('cardTarget -  Drop', item.itemType);
//       return;
//     }
//     if (item.data && typeof item.setAsChild === 'function') {
//       // console.log('BOX', item);
//       if (dragIndex === -1) {
//         props.insertCard(item, hoverIndex, dragIndex);
//       }
//     }
//   },
//   hover(props, monitor, component) {
//     const item = monitor.getItem();

//     if (item.itemType === ItemTypes.BOX && item.index === -1) return;

//     // Don't replace multi-column component unless both drag & hover are multi-column
//     if (props.data?.isContainer && !item.data?.isContainer) return;

//     const dragIndex = item.index;
//     const hoverIndex = props.index;

//     // Don't replace items with themselves
//     if (dragIndex === hoverIndex) {
//       return;
//     }

//     if (dragIndex === -1) {
//       if (props.data && props.data.isContainer) {
//         return;
//       }
//       // console.log('CARD', item);
//       item.index = hoverIndex;
//       props.insertCard(item.onCreate(item.data), hoverIndex,dragIndex,props.id);
//     }

//     // Determine rectangle on screen
//     const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

//     // Get vertical middle
//     const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

//     // Determine mouse position
//     const clientOffset = monitor.getClientOffset();

//     // Get pixels to the top
//     const hoverClientY = clientOffset.y - hoverBoundingRect.top;

//     // Only perform the move when the mouse has crossed half of the items height
//     // When dragging downwards, only move when the cursor is below 50%
//     // When dragging upwards, only move when the cursor is above 50%

//     // Dragging downwards
//     if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//       return;
//     }

//     // Dragging upwards
//     if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//       return;
//     }

//     // Time to actually perform the action
//     props.moveCard(dragIndex, hoverIndex);

//     // Note: we're mutating the monitor item here!
//     // Generally it's better to avoid mutations,
//     // but it's good here for the sake of performance
//     // to avoid expensive index searches.

//     // if (item.itemType == ItemTypes.BOX) item.cardIndex = hoverIndex;
//     // else
//     item.index = hoverIndex;
//   },
// };

// // eslint-disable-next-line no-unused-vars
// export  function abc (ComposedComponent) {
//   class Card extends Component {
//     static propTypes = {
//       connectDragSource: PropTypes.func,
//       connectDragPreview: PropTypes.func,
//       connectDropTarget: PropTypes.func,
//       index: PropTypes.number.isRequired,
//       isDragging: PropTypes.bool,
//       id: PropTypes.any.isRequired,
//       // text: PropTypes.string.isRequired,
//       moveCard: PropTypes.func.isRequired,
//       seq: PropTypes.number,
//     }

//     static defaultProps = {
//       seq: -1,
//     };

//     render() {
//       const {
//         isDragging,
//         connectDragPreview,
//         connectDropTarget,
//       } = this.props;
//       const opacity = isDragging ? 0 : 1;

//       return connectDragPreview(
//         connectDropTarget(<div><ComposedComponent {...this.props} style={{ ...style, opacity }}></ComposedComponent></div>),
//       );
//     }
//   }

//   const x = DropTarget([ItemTypes.CARD, ItemTypes.BOX], cardTarget, connect => ({
//     connectDropTarget: connect.dropTarget(),
//   }))(Card);

//   return DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
//     connectDragSource: connect.dragSource(),
//     connectDragPreview: connect.dragPreview(),
//     isDragging: monitor.isDragging(),
//   }))(x);
// }

export default function (Component) {
  return (props) => {
    const { id, index, moveCard, insertCard, data, onCreate,className,...restProps } =
      props;
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
      item: { type: ItemTypes.CARD, id, index, data },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [collectedProps, drop] = useDrop({
      accept: [ItemTypes.CARD, ItemTypes.BOX, ItemTypes.Container],
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }),
      drop(item, monitor) {
        console.log("item>>>>>>>>>>>>>>>>>>>",item)
        if (!ref.current) {
          return;
        }

        const hoverIndex = index;
        const dragIndex = item.index;

        if ((data && data.isContainer) || item.itemType === ItemTypes.CARD) {
          return;
        }

        // if (item.data && typeof item.setAsChild === "function") {
        //   if (dragIndex === -1) {
        //   }
        // }
        const didDropOnContainer = monitor.didDrop();
        if (!didDropOnContainer) {
          insertCard(item?.onCreate?.(item?.data), hoverIndex, dragIndex,id);
        }
      },
      hover(item, monitor) {
        const dragIndex = item.index;
        const hoverIndex = index;
        const isDragging=monitor.canDrop()
        // console.log("isDragging>>>>>>>",isDragging)

        if ((item.itemType === ItemTypes.BOX || item.itemType ===ItemTypes.Container) && item.index === -1) return;

        if (data?.isContainer && !item.data?.isContainer) return;

        if (dragIndex === hoverIndex) {
          return;
        }

        if (dragIndex === -1) {
          if (data && data.isContainer) {
            return;
          }
          item.index = hoverIndex;
          // insertCard(
          //   item?.onCreate?.(item.data) || item.data,
          //   hoverIndex,
          //   dragIndex,
          //   id
          // );
        }

        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        moveCard(dragIndex, hoverIndex);

        item.index = hoverIndex;
      },
    });

    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));
    return (
      <div ref={ref} style={{opacity,...style,position:'relative' }} className={`flex-1 ${collectedProps.isOver ? 'border border-slate-900 border-dashed rounded-md h-auto' : "h-auto border border-red-900 border-dashed rounded-md"}`}>
        <Component {...props} className={className} ref={ref} />
      </div>
    );
  };
}

// Card.propTypes = {
//   id: PropTypes.any.isRequired,
//   index: PropTypes.number.isRequired,
//   moveCard: PropTypes.func.isRequired,
//   insertCard: PropTypes.func.isRequired,
//   data: PropTypes.object,
//   onCreate: PropTypes.func.isRequired,
// };

// export default Card;
