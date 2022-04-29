import { useContractReader } from "eth-hooks";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button, List, Card, Spin } from "antd";
import { Address } from "../components";

function Home({ DEBUG, readContracts, writeContracts, tx, mainnetProvider, blockExplorer }) {
  const priceToMint = useContractReader(readContracts, "LoogieShip", "price");
  if (DEBUG) console.log("🤗 priceToMint:", priceToMint);

  const totalSupply = useContractReader(readContracts, "LoogieShip", "totalSupply");
  if (DEBUG) console.log("🤗 totalSupply:", totalSupply);
  const shipsLeft = 1000 - totalSupply;

  const [allShips, setAllShips] = useState();
  const [page, setPage] = useState(1);
  const [loadingShips, setLoadingShips] = useState(true);
  const perPage = 9;

  useEffect(() => {
    const updateAllShips = async () => {
      if (readContracts.LoogieShip && totalSupply) {
        setLoadingShips(true);
        const collectibleUpdate = [];
        let startIndex = totalSupply - 1 - perPage * (page - 1);
        for (let tokenIndex = startIndex; tokenIndex > startIndex - perPage && tokenIndex >= 0; tokenIndex--) {
          try {
            if (DEBUG) console.log("Getting token index", tokenIndex);
            const tokenId = await readContracts.LoogieShip.tokenByIndex(tokenIndex);
            if (DEBUG) console.log("Getting Ship tokenId: ", tokenId);
            const tokenURI = await readContracts.LoogieShip.tokenURI(tokenId);
            if (DEBUG) console.log("tokenURI: ", tokenURI);
            const jsonManifestString = atob(tokenURI.substring(29));
            const owner = await readContracts.LoogieShip.ownerOf(tokenId);
            if (DEBUG) console.log("owner: ", owner);

            try {
              const jsonManifest = JSON.parse(jsonManifestString);
              collectibleUpdate.push({ id: tokenId, uri: tokenURI, owner: owner, ...jsonManifest });
            } catch (e) {
              console.log(e);
            }
          } catch (e) {
            console.log(e);
          }
        }
        setAllShips(collectibleUpdate);
        setLoadingShips(false);
      }
    };
    updateAllShips();
  }, [DEBUG, readContracts.LoogieShip, (totalSupply || "0").toString(), page]);

  return (
    <div style={{ backgroundColor: "#29aae1" }}>
      <div class="home" style={{ width: 1280, height: 800, margin: "auto" }}>
        <img src="/images/home.svg" style={{ paddingTop: 220 }} />
      </div>
      <div style={{ margin: "auto", padding: 32, backgroundImage: "linear-gradient(#0071bb, #29aae1)", paddingBottom: 0 }}>
        <div style={{ display: "flex" }}>
          <Card
            style={{ backgroundColor: "#b3e2f4", border: "1px solid #0071bb", borderRadius: 10, width: 300, marginRight: 10, textAlign: "left", fontSize: 16 }}
            title={
              <div>
                <span style={{ fontSize: 18, marginRight: 8, fontWeight: "bold" }}>1. Mint a LoogieShip</span>
              </div>
            }
          >
            <div>
              <p>
                Mint your unique NFT LoogieShip.
              </p>
              <img src="/images/ship.svg" alt="LoogieShip" title="LoogieShip" style={{ width: 250, marginTop: 20 }} />
              <img src="/images/ship2.svg" alt="LoogieShip" title="LoogieShip" style={{ width: 250 }} />
              <img src="/images/ship3.svg" alt="LoogieShip" title="LoogieShip" style={{ width: 250 }} />
              <p style={{ marginTop: 10 }}>
                Each LoogieShip came with <strong>20,000 LoogieCoins!!</strong>
              </p>
            </div>
          </Card>
          <Card
            style={{ backgroundColor: "#b3e2f4", border: "1px solid #0071bb", borderRadius: 10, width: 300, marginRight: 10, textAlign: "left", fontSize: 16 }}
            title={
              <div>
                <span style={{ fontSize: 18, marginRight: 8, fontWeight: "bold" }}>2. Add the Crew</span>
              </div>
            }
          >
            <div>
              You need 4 FancyLoogies:
              <ul style={{ paddingLeft: 0, marginLeft: -25 , marginTop: 40 }}>
                <li class="ant-list-item">
                  <div class="crew-member">
                    <div>
                      <img src="/images/captain.svg" alt="Captain" title="Captain" style={{ width: 150 }} />
                      <span style={{ fontWeight: "bold", marginTop: -40 }}>Captain</span>
                    </div>
                    <span>
                      A FancyLoogie with a <strong>Bow</strong>
                    </span>
                  </div>
                </li>
                <li class="ant-list-item" style={{ marginTop: 20 }}>
                  <div class="crew-member">
                    <div>
                      <img src="/images/engineer.svg" alt="Chief Engineer" title="Chief Engineer" style={{ width: 150 }} />
                      <span style={{ fontWeight: "bold", marginTop: -40 }}>Chief Engineer</span>
                    </div>
                    <span>
                      A FancyLoogie with a <strong>Mustache</strong>
                    </span>
                  </div>
                </li>
                <li class="ant-list-item" style={{ marginTop: 20 }}>
                  <div class="crew-member">
                    <div>
                      <img src="/images/officer.svg" alt="Deck Officer" title="Deck Officer" style={{ width: 150 }} />
                      <span style={{ fontWeight: "bold", marginTop: -40 }}>Deck Officer</span>
                    </div>
                    <span>
                      A FancyLoogie with <strong>Contact Lenses</strong>
                    </span>
                  </div>
                </li>
                <li class="ant-list-item" style={{ marginTop: 20 }}>
                  <div class="crew-member">
                    <div>
                      <img src="/images/seaman.svg" alt="Seaman" title="Seaman" style={{ width: 150 }} />
                      <span style={{ fontWeight: "bold", marginTop: -40 }}>Seaman</span>
                    </div>
                    <span>
                      A FancyLoogie with <strong>Eyelashes</strong>
                    </span>
                  </div>
                </li>
              </ul>
              <p style={{ marginTop: 50, marginBottom: 0 }}>
                You can mint <strong>OptmisticLoogies</strong> and <strong>FancyLoogies</strong> at <a style={{ fontSize: 22 }} href="https://www.fancyloogies.com" target="_blank">www.fancyloogies.com</a>
              </p>
            </div>
          </Card>
          <Card
            style={{ backgroundColor: "#b3e2f4", border: "1px solid #0071bb", borderRadius: 10, width: 300, marginRight: 10, textAlign: "left", fontSize: 16 }}
            title={
              <div>
                <span style={{ fontSize: 18, marginRight: 8, fontWeight: "bold" }}>3. Go Fishing</span>
              </div>
            }
          >
            <div>
              Send your LoogieShip to fish once a day.
              <img src="/images/ship-fishing1.svg" alt="LoogieShip" title="LoogieShip" style={{ width: 250 }} />
              <img src="/images/ship-fishing2.svg" alt="LoogieShip" title="LoogieShip" style={{ width: 250 }} />
              <img src="/images/ship-fishing3.svg" alt="LoogieShip" title="LoogieShip" style={{ width: 250 }} />
              <p style={{ marginTop: 20 }}>
                You have to pay <strong>3,000 LoogieCoins</strong> to your crew each time they go fishing.
              </p>
            </div>
          </Card>
          <Card
            style={{ backgroundColor: "#b3e2f4", border: "1px solid #0071bb", borderRadius: 10, width: 300, textAlign: "left", fontSize: 16 }}
            title={
              <div>
                <span style={{ fontSize: 18, marginRight: 8, fontWeight: "bold" }}>4. NFT Prizes!</span>
              </div>
            }
          >
            <div>
              The ship with the highest catch of the week will win one of the following NFTs prizes!
              <img src="/images/award1.svg" alt="SailorLoogies Game Award" title="SailorLoogies Game Award" style={{ width: 250 }} />
              <img src="/images/award2.svg" alt="SailorLoogies Game Award" title="SailorLoogies Game Award" style={{ width: 300, marginLeft: -25 }} />
              <img src="/images/award3.svg" alt="SailorLoogies Game Award" title="SailorLoogies Game Award" style={{ width: 250 }} />
              <p style={{ fontSize: 24, fontWeight: "bold", marginTop: 50, textAlign: "center" }}>
                Start fishing now!!
              </p>
            </div>
          </Card>
        </div>
        <div style={{ marginTop: 50 }}>
          <div style={{ fontSize: 24 }}>
            <p>
              Only <strong>1000 Loogie Ships</strong> available.
            </p>
          </div>
          <Button
            style={{ width: 300, fontSize: 20, height: 40 }}
            type="primary"
            onClick={async () => {
              const priceRightNow = await readContracts.LoogieShip.price();
              try {
                const txCur = await tx(writeContracts.LoogieShip.mintItem({ value: priceRightNow, gasLimit: 30000000 }));
                await txCur.wait();
              } catch (e) {
                console.log("mint failed", e);
              }
            }}
          >
            MINT for Ξ{priceToMint && (+ethers.utils.formatEther(priceToMint)).toFixed(4)}
          </Button>

          <p style={{ fontWeight: "bold" }}>{shipsLeft} left</p>
        </div>
      </div>

      <div style={{ width: "auto", margin: "auto", padding: 25, minHeight: 800 }}>
        <div>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            pagination={{
              total: totalSupply,
              defaultPageSize: perPage,
              defaultCurrent: page,
              onChange: currentPage => {
                setPage(currentPage);
              },
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${totalSupply} items`,
            }}
            loading={loadingShips}
            dataSource={allShips}
            renderItem={item => {
              const id = item.id.toNumber();

              return (
                <List.Item key={id + "_" + item.uri + "_" + item.owner}>
                  <Card
                    style={{ backgroundColor: "#b3e2f4", border: "1px solid #0071bb", borderRadius: 10 }}
                    title={
                      <div>
                        <span style={{ fontSize: 18, marginRight: 8, fontWeight: "bold" }}>{item.name}</span>
                      </div>
                    }
                  >
                    <img src={item.image} alt={"Loogie Ship #" + id} width="380" />
                    <div>
                      <Address
                        address={item.owner}
                        ensProvider={mainnetProvider}
                        blockExplorer={blockExplorer}
                        fontSize={16}
                      />
                    </div>
                  </Card>
                </List.Item>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
