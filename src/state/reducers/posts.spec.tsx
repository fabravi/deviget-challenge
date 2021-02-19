import { AnyAction } from "@reduxjs/toolkit";
import posts from "./posts";

describe("posts reducer", () => {
  const baseState = {
    list: [
      {
        id: "lmsr6w",
        author: "THE_SAUCE_OF_LEGENDS",
        title:
          "Two Domino’s workers after their shift in San Antonio, Texas today. All food gone in 4 hours.",
        created: "10 hours ago",
        comments: 10950,
        thumbnail:
          "https://a.thumbs.redditmedia.com/2I7-knaKEfy-0TGTJZ4qxMndDHbtxCwBT_phnDgnaq4.jpg",
        image:
          "https://external-preview.redd.it/9LyfPVxANDJx8H-RdHZZANORig_Y4myTjcAhKrzrxqI.jpg?auto=webp&s=0129ee95ed8fd6f867b19871a9d66479da9cca59",
      },
      {
        id: "lmkodi",
        author: "elch3w",
        title: "Imagine if this COVID outbreak happened 10 years ago",
        created: "17 hours ago",
        comments: 1167,
        thumbnail:
          "https://b.thumbs.redditmedia.com/dEeAnd1S2xF_vYB0ZGoEy0du4d7GAs1GoetRuloheiI.jpg",
        image:
          "https://preview.redd.it/ohsp2bgd18i61.jpg?auto=webp&s=8cf1d2e5a719807d149267f8d7450ce64503212c",
      },
    ],
    status: {},
    after: null,
    initializing: true,
    fetching: true,
  };

  it("should handle initial state", () => {
    expect(posts(baseState, {} as AnyAction)).toEqual(baseState);
  });

  it("should handle read", () => {
    let expectedState = {
      ...baseState,
      status: {
        lmsr6w: {
          read: true,
        },
      },
    };

    expect(
      posts(baseState, {
        type: "posts/read",
        payload: "lmsr6w",
      })
    ).toEqual(expectedState);
  });

  it("should handle dismiss", () => {
    let expectedState = {
      ...baseState,
      status: {
        lmsr6w: {
          dismiss: true,
        },
      },
    };

    expect(
      posts(baseState, {
        type: "posts/dismiss",
        payload: "lmsr6w",
      })
    ).toEqual(expectedState);
  });

  it("should handle dismiss all", () => {
    let expectedState = {
      ...baseState,
      status: {
        lmsr6w: {
          dismiss: true,
        },
        lmkodi: {
          dismiss: true,
        },
      },
    };

    expect(
      posts(baseState, {
        type: "posts/dismissAll",
      })
    ).toEqual(expectedState);
  });
});
