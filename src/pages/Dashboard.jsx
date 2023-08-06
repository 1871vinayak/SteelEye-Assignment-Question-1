import { useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  //Converting into object with Key and Value pair where Key is ID itself, Value is the rest Data.

  const obj = Object.fromEntries(
    timestamps.results.map((value) => [[value["&id"]], [value.timestamps]])
  );
  const parsedRowData = mockData.results
    .map((val) => ({
      ...val,
      orderSubmitted: obj[val["&id"]][0],
    }))
    .filter((row) => row["&id"]?.toLowerCase().includes(searchText ?? ""));

  return (
    <div>
      <div className={styles.header}>
        {/* <HeaderTitle primaryTitle="Orders" secondaryTitle="5 orders" /> */}
        <HeaderTitle
          primaryTitle="Orders"
          secondaryTitle={(parsedRowData ?? []).length}
        />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.sectionl}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          </div>
          <div className={styles.sectionr}>
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
          </div>
        </div>
        {/* <List rows={mockData.results} /> */}
        <List
          rows={parsedRowData}
          currency={currency}
          setSelectedOrderDetails={setSelectedOrderDetails}
          setSelectedOrderTimeStamps={setSelectedOrderTimeStamps}
        />
      </div>
    </div>
  );
};

export default Dashboard;
