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
                const res = await axios.get(`http://localhost:3001/api/profile?email=${user_email}`);
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
            await axios.post("http://localhost:3001/api/profile/update", {
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
        <div>
            <h2>Your Avatar</h2>
            <p>Coins: {coins}</p>

            {/* insert images here example beloww */}
            {/* <div className="avatar-preview">
        <img src="/avatars/base.png" alt="Base avatar" />
        {avatar.hat && <img src={/avatars/hats/${avatar.hat}.png} className="layer" />}
        {avatar.glasses && <img src={/avatars/glasses/${avatar.glasses}.png} className="layer" />}
      </div> */}


            <h3>Shop</h3>
            <div>
                <button onClick={() => handleBuy("hat", "wizard", 10)}>🧙 Wizard Hat - 10 coins</button>
                <button onClick={() => handleBuy("glasses", "round", 5)}>👓 Round Glasses - 5 coins</button>
            </div>
        </div>
    );
}

export default AvatarPage;