const { Link } = require("react-router-dom");

<div className="mt-8 px-5">
        <h2 className="font-semibold text-2xl mb-10">Polls</h2>

        {/* Navigation */}
        <div className="flex text-primary-dark-gray items-center gap-10 lg:text-xl font-semibold border-b-[3px] border-b-primary-dark-gray">
          <Link
            onClick={() => setLink("")}
            className={link == "" ? activeLink : "pb-5"}
            to="/polls"
          >
            Active Polls
          </Link>
          <Link
            onClick={() => setLink("history")}
            className={link == "history" ? activeLink : "pb-5"}
            to="/polls/history"
          >
            History
          </Link>
        </div>
      </div>