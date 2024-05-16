import AdvertisementCollection from "@/components/AdvertisementCollection";

const items = [
  {
    title: "Mi título super creativo de mega partido",
    badges: ["Waterfront", "Verified"],
  },
  {
    title: "Milford - Room #2",
    badges: ["Mountain", "Verified"],
  },
  {
    title: "Milford - Room #3",
    badges: ["Mountain", "Verified"],
  },
];

export default function AdsPage() {
  return <AdvertisementCollection items={items} />;
}
