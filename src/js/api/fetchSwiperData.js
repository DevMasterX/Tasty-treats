// export async function fetchSwiperData() {}

export function fetchSwiperData() {
  return fetch('https://tasty-treats-backend.p.goit.global/api/events ').then(
    resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    }
  );
}

fetchSwiperData().then(data => console.log(data));
