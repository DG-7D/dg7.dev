import { defineHastPlugin } from "satteri";

export default function satteriHastUnwrapImages() {
    return defineHastPlugin({
        name: "satteri-hast-unwrap-images",
        element: [
            {
                filter: ["img"],
                visit: (node, ctx) => {
                    const parent = ctx.parent(node);
                    if (parent.type === "element" && parent.tagName === "p") {
                        ctx.replaceNode(parent, node);
                    }
                }
            }
        ]
    });
}