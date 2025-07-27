import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";

interface Avatar {
  hat?: string;
  glasses?: string;
}

function AvatarPage() {
  const [coins, setCoins] = useState(0);
  const [avatar, setAvatar] = useState<Avatar>({});
  const [loading, setLoading] = useState(true);

  const user = getAuth().currentUser;
  const user_email = user?.email;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user_email) return;
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile?email=${user_email}`);
        setCoins(res.data.coins);
        setAvatar(res.data.avatar || {});
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user_email]);

  const handleBuy = async (itemType: keyof Avatar, itemName: string, cost: number) => {
    if (coins < cost) {
      alert("Not enough coins!");
      return;
    }

    const updatedAvatar = { ...avatar, [itemType]: itemName };
    const updatedCoins = coins - cost;

    try {
      await axios.post("${process.env.REACT_APP_API_URL}/api/profile/update", {
        email: user_email,
        coins: updatedCoins,
        avatar: updatedAvatar,
      });
      setCoins(updatedCoins);
      setAvatar(updatedAvatar);
    } catch (err) {
      console.error("Failed to update avatar:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Your Avatar</h2>
      <p>Coins: <strong>{coins}</strong></p>

      <div style={{ margin: "1rem 0" }}>
        {Object.keys(avatar).length > 0 ? (
          <p>Equipped items: {Object.entries(avatar).map(([key, val]) => `${key}: ${val}`).join(", ")}</p>
        ) : (
          <p>No items equipped yet.</p>
        )}
      </div>

      <h3>Shop</h3>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <button onClick={() => handleBuy("hat", "wizard", 10)}>
          🧙 Wizard Hat - 10 coins
        </button>
        <button onClick={() => handleBuy("glasses", "round", 5)}>
          👓 Round Glasses - 5 coins
        </button>
      </div>
    </div>
  );
}

export default AvatarPage;
