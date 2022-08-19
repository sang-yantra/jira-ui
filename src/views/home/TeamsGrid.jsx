import React from "react";
function TeamsGrid() {
  return <div className="text-white"></div>;
}

export default TeamsGrid;
// window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 5000;

// class Card extends React.Component {
//   state = { expanded: false };
//   randomNumber = Math.floor(Math.random() * 5) + 1;

//   render() {
//     return (
//       <div
//         className={`card card--${this.randomNumber} ${
//           this.state.expanded ? "card--expanded" : ""
//         }`}
//         onClick={() => {
//           this.setState({ expanded: !this.state.expanded });
//         }}
//       >
//         <div>
//           <div className="card__avatar" />
//           <div className="card__title" />
//           <div className="card__description" />
//         </div>
//       </div>
//     );
//   }
// }

// class Grid extends React.Component {
//   componentDidMount() {
//     // will automatically clean itself up when dom node is removed
//     animateCSSGrid.wrapGrid(this.grid, {
//       easing: "backOut",
//       stagger: 10,
//       duration: 400,
//     });
//   }

//   render() {
//     let classes = "grid";
//     Object.keys(this.props.settings)
//       .filter((k) => this.props.settings[k])
//       .forEach((k) => (classes += " " + k));
//     return (
//       <div className={classes} ref={(el) => (this.grid = el)}>
//         {[...Array(10).keys()].map((i) => (
//           <Card key={i} />
//         ))}
//       </div>
//     );
//   }
// }

// class GridContainer extends React.Component {
//   state = {
//     "grid-gap": false,
//     "grid-template-columns": false,
//   };

//   render() {
//     return (
//       <div className="p-4">
//         <a href="https://github.com/aholachek/animate-css-grid">
//           animate-css-grid
//         </a>
//         <div className="mb-4 pt-4">
//           {Object.keys(this.state).map((k, index) => (
//             <button
//               className="btn"
//               key={index}
//               onClick={() => this.setState({ [k]: !this.state[k] })}
//             >
//               toggle <code>{k}</code>
//             </button>
//           ))}
//         </div>
//         <Grid settings={this.state} />
//       </div>
//     );
//   }
// }
