import axios from "axios";
import { useState } from "react";
import "./styles.css"; // styles.css dosyasını import et

function App() {
  const [activities, setActivities] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const fetchActivity = async () => {
    try {
      const response = await axios.get("https://www.boredapi.com/api/activity");
      setActivities([...activities, response.data]);
    } catch (error) {
      console.error("Error fetching activity:", error);
    }
  };

  const handleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      <div className="header">Activity Generator</div> {/* Başlık ekleniyor */}
      <div className="App">
        <button onClick={fetchActivity}>Generate Activity</button>
        <ul>
          {activities.map((activity, index) => (
            <ExpandableListItem
              key={activity.key}
              item={activity}
              isExpanded={expandedIndex === index}
              onExpand={() => handleExpand(index)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

const ExpandableListItem = ({ item, isExpanded, onExpand }) => {
  return (
    <li>
      <div>
        <h3>{item.activity}</h3>
        <button onClick={onExpand}>
          {isExpanded ? "Hide Details" : "Show Details"}
        </button>
      </div>
      {isExpanded && (
        <div className="details">
          <p>
            <strong>Type:</strong> {item.type}
          </p>
          <p>
            <strong>Participants:</strong> {item.participants}
          </p>
          <p>
            <strong>Price:</strong> {item.price}
          </p>
          <p>
            <strong>Link:</strong> {item.link || "N/A"}
          </p>
          <p>
            <strong>Accessibility:</strong> {item.accessibility}
          </p>
        </div>
      )}
    </li>
  );
};

export default App;
