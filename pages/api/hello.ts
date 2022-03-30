// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import TileReduce from "@mapbox/tile-reduce";

type Data = Record<string, any>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await new Promise((resolve) => {
    var opts = {
      zoom: 10,
      bbox: [-116.981205,32.380493,-116.828770,32.499290],
      sources: [
        {
          name: "baja",
          mbtiles: "./pages/api/ba.mbtiles",
        },
      ],
      map: "/Users/nicholasromano/Documents/next-spatial/pages/api/map.js",
    };
    var save = { type: "FeatureCollection", features: []};;

    function mapResults(result, saveTo) {
      if (result.features.length) {
        saveTo.features.push(...result.features);
      };
    }

    var tilereduce = TileReduce(opts)
      .on("reduce", function (result, tile) {
        mapResults(result, save);
      })
      .on("end", function (error) {
        resolve(res.status(200).json(save)); // info
      });
  });
}
