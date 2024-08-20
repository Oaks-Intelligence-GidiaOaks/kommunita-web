 {/* <div className="flex justify-end gap-3">
              {isVisible && (
                <>
                  <div className="bg-[#fbf8f8] rounded-md w-35 h-10">
                    <select
                      value={category}
                      onChange={handleCategoryChange}
                      className="focus:outline-none focus:ring-0 border-0 bg-transparent w-full h-full px-2 make-post-input"
                    >
                      <option value="">Category</option>
                      {Category?.data?.map((data, index) => (
                        <option value={data?.name} key={index}>
                          {data.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-[#fbf8f8] rounded-md h-10 flex items-center px-3">
                    <div className="flex items-center space-x-2 w-35">
                      <div className="text-gray-600 ">
                        {audience === "Public" ? (
                          <BiGlobe size={20} />
                        ) : audience === "Private" ? (
                          <BiLock size={20} />
                        ) : (
                          <BiGroup size={20} />
                        )}
                      </div>
                      <select
                        value={audience}
                        onChange={handleAudienceChange}
                        className="focus:outline-none focus:ring-0 border-0 bg-transparent w-full h-full make-post-input"
                      >
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                        <option value="Followers">Followers</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={submitting || !content}
                    className={`${
                      !content
                        ? "bg-gray-200 text-gray-600"
                        : "bg-[#2CC84A] text-white"
                    } w-[121px] h-10 rounded-md`}
                  >
                    {submitting ? (
                      <BeatLoader color="#ffffff" loading={true} />
                    ) : (
                      "Post"
                    )}