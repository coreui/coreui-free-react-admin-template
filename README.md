# Chorvoq GIS – Land Territory Management App

Chorvoq GIS is a web-based GIS (Geographic Information System) tool built with React that allows users to manage and monitor land territories. It enables users to create, label, and organize territorial boundaries directly on an interactive map. This is especially useful for government agencies tracking land allocation or businesses managing regional planning.

---

## 🌍 Features

- 📍 **Add & Save Territories** – Users can draw shapes on the map to represent different land areas and label them with custom data.
- 🗂️ **Layer Management** – Multiple shapes can be organized under a single **layer**. Each map view is considered a layer.
- 🔎 **Searchable Layers** – Easily locate and manage specific shapes or layers.
- ✅ **Status Indicators** – Track whether layers are ready or fully created.
- 🗺️ **Interactive Map Interface** – Intuitive map drawing and editing with satellite background.
- 🧩 **Modular Design** – Built with React for flexibility and easy integration with other systems.

---

## 📸 Interface Preview

![Layer Management](./path-to-screenshot1.png)  
*Layer Management Panel*

![Map Interaction](./path-to-screenshot2.png)  
*Map with Drawing and Shape Management*

---

## ⚙️ How It Works

1. **Create a Layer**: Upload or define a new map layer to manage territories.
2. **Add Shapes**: Use the map editor to draw polygons (territories) within the selected layer.
3. **Add Metadata**: Input details like `objectid`, `fid_shape`, `shape_length`, `created_by`, and `created_at` for each shape.
4. **Save and View**: All saved shapes are displayed over the map and can be edited or deleted as needed.

Each **layer** can contain multiple **shapes**, and each shape holds metadata for tracking.

---

## 🛠️ Tech Stack

- **Frontend**: React, Leaflet.js (for map), Bootstrap / TailwindCSS (optional for UI)
- **Backend**: Not included in this repo (if needed, can be connected to REST APIs or GIS servers like GeoServer)
- **Database**: None by default. Can be extended to use PostgreSQL + PostGIS or others.
- **Map Source**: OpenStreetMap, Satellite Imagery (via Leaflet plugins)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/chorvoq-gis.git
cd chorvoq-gis
npm install
```

### Running the App

```bash
npm start
```

This will launch the app in development mode at `http://localhost:3000`.

---

## 📂 Project Structure

```
chorvoq-gis/
│
├── public/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Map, Layers, Dashboard, etc.
│   ├── services/          # API logic or layer data
│   ├── App.js
│   ├── index.js
│
├── README.md              # This file
├── package.json
```

---

## ✅ Future Improvements

- 🔐 User Authentication & Role Management
- 🗺️ Exporting maps and layers as PDF or GeoJSON
- 🧭 Geo-location and GPS integration
- 📡 Backend integration with spatial databases (PostGIS, GeoServer)

---

## 🤝 Use Cases

- Government land and property monitoring
- Agricultural land planning
- Utility or infrastructure mapping
- Environmental zone tracking

---

## 🧑‍💻 Contributing

Want to contribute? Feel free to fork the repository and make improvements. PRs are welcome!

---

## 📬 Contact

Developed by **Muhammadayub Erkinov**  
For any queries, feel free to reach out!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
