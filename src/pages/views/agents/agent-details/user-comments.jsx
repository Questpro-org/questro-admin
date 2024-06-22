import React from "react";
import Bed from "../../../../assets/images/bed 1.svg";
import Bath from "../../../../assets/images/bath-tub 1.svg";

function UserComments({ comment }) {
  return (
    <div className="mt-6">
      <h4 className="text-[#28292C] text-[16px] font-bold">User comments</h4>

      {comment && comment.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white">
          {comment.map((agentComments, index) => (
            Object.keys(agentComments).map((agentId) => (
              <div key={agentId} className="">
                {agentComments[agentId].map((commentItem) => (
                  <div key={commentItem._id} className="bg-white shadow-lg rounded p-4">
                    <p className="text-[#000000] text-[16px] font-semibold">{commentItem.name} <span className="text-[12px] text-[#6A6A6A] font-normal">{commentItem.updatedAt}</span></p>
                    <p className="text-[14px]">{commentItem.comment}</p>
                  </div>
                ))}
              </div>
            ))
          ))}
        </div>
      ) : (
        <div className="text-center text-[#28292C] text-[16px] font-bold">
          No comments available
        </div>
      )}
    </div>
  );
}

export default UserComments;

