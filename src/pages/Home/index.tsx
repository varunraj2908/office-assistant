import robot from "./../../assets/images/robot.png";
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate(); 
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background:
          "linear-gradient(to right, #BA39EF, #BF074c, #FF748B, rgba(255, 155, 119, 0.3))",
        backdropFilter: "blur(25px)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "10vh",
          display: "flex",
          alignItems: "end",
        }}
      >
        <h1
          style={{
            margin: 0,
            padding: 0,
            paddingLeft: "170px",
            color: "white",
            fontWeight:600,
            fontSize:"30px"
          }}
        >
          INTELIGENCE
        </h1>
      </div>
      <div
        style={{
          height:  "90%" ,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px" ,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",

        }}
      >
        <div
          style={{
            width: "45%",
            textAlign: "left",
            color: "white",
            fontSize: "15px",
            paddingRight: "60px",
            paddingLeft: "130px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            
          }}
        >
          <h1 style={{ fontSize: "50px", margin: 0, padding: 0, fontWeight:600, }}>
            AI INNOVATION
          </h1>
          <h1 style={{ fontWeight: 400 ,fontSize: "26px", margin: 0, padding: 0 }}>
            Ideal for a platform that uses AI to drive tech solutions and
            innovation.
          </h1>
          <p style={{ padding: 3, margin: 3 }}>
            AI: The Heart of Tomorrow's Tech.
          </p>
          <p style={{ padding: 3, margin: 3 }}>
            AI Solutions That Redefine the Future of Tech.
          </p>
          <p style={{ padding: 3, margin: 3 }}>
            AI Solutions for the Next Generation of Technology.
          </p>
          <button
            style={{
              width: "260px",
              height: "50px",
              background:
                "linear-gradient(to right, #BA39EF, #BF074c, #FF748B, rgba(255, 155, 119, 0.3))",
              fontSize: "22px",
              fontWeight: 700,
              cursor: "pointer",
              color: "white",
              borderRadius: "100px",
              backdropFilter: "blur(25px)",
              marginTop: "20px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              border: "3px solid rgba(255, 255, 255, 0.4)",
            }}
            onClick={() => navigate("/chat")}
           
          >
            Get It Free Now
          </button>
        </div>

        <div
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: "770px",
              width:  "700px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              backgroundImage: `url(${robot})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Home;