export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json("GET METHOD WORKED");
  }
  if (req.method === "POST") {
    res.status(200).json("POST METHOD WORKED");
  }
}
